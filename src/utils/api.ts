import Filters from "@/types/filters"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? (() => {
  throw new Error("Variável NEXT_PUBLIC_API_URL não definida!");
})();

function delay(ms: number, onTick?: (seconds: number) => void) {
  return new Promise<void>((resolve) => {
    if (!onTick) return setTimeout(resolve, ms);

    let seconds = ms / 1000;
    const interval = setInterval(() => {
      seconds--;
      onTick(seconds);
      if (seconds <= 0) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

export async function getFiles(
  filters: Filters & { page: number; limit?: number },
  retries = 5,
  delayMs = 5000,
  onCountdownUpdate?: (seconds: number) => void
): Promise<any> {
  const url = new URL(`${API_URL}/files`);

  if (filters.search?.trim()) {
    url.searchParams.append("search", filters.search.trim());
  }

  if (
    filters.category &&
    filters.category !== "" &&
    filters.category !== "Todas as categorias"
  ) {
    url.searchParams.append("category", filters.category);
  }

  if (filters.date && !isNaN(Date.parse(filters.date))) {
    url.searchParams.append("date", filters.date);
  }

  url.searchParams.append("page", filters.page.toString());
  url.searchParams.append("limit", (filters.limit || 12).toString());

  try {
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`[getFiles] Erro: ${err}. Tentativas restantes: ${retries}`);

    if (retries > 0) {
      await delay(delayMs, onCountdownUpdate);
      return getFiles(filters, retries - 1, delayMs * 2, onCountdownUpdate);
    } else {
      throw new Error("Falha ao buscar arquivos após várias tentativas.");
    }
  }
}


export async function downloadArquivo(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/files/${id}/download`);

    if (!response.ok) {
      throw new Error('Erro ao baixar o arquivo');
    }


    const disposition = response.headers.get('Content-Disposition');
    let fileName = 'arquivo';

    if (disposition) {
      const match = disposition.match(/filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/);
      if (match) {
        fileName = decodeURIComponent(match[1] || match[2]);
      }
    }

    const blob = await response.blob();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Erro ao baixar arquivo:', error);
  }
}
export default function getAcceptByCategory(category: string): string {
  switch (category.toLowerCase()) {
    case "documento":
      return "application/pdf";
    case "imagem":
      return "image/*";
    case "planilha":
      return ".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "apresentação":
      return ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";
    case "outros":
        return "*/*";
    default:
      return "*/*";
  }
}

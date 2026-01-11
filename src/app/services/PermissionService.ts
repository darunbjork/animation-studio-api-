type Role = "ARTIST" | "DIRECTOR" | "PRODUCER";

export class PermissionService {
  static canApprove(role: Role) {
    return role === "DIRECTOR" || role === "PRODUCER";
  }

  static canDelete(role: Role) {
    return role === "PRODUCER";
  }

  static canUpload(role: Role) {
    return true; // All roles can upload by default
  }

  // Add more permission checks as needed
}

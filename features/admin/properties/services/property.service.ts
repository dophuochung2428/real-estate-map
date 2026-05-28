export const propertyService = {
  async getAdminProperties() {
    const res = await fetch("/api/admin/properties");

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return res.json();
  },

  async changeStatus(id: string, status: string) {
    const res = await fetch("/api/admin/properties/change-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Update failed");
    }

    return data;
  },
};

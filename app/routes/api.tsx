import { ActionFunction } from "@remix-run/node";
import { ApiOps } from "~/types/ApiOps";

export const action: ActionFunction = async (args) => {
  try {
    const parsedFormData = await args.request.formData();
    const operation = parsedFormData.get("operation") as ApiOps;
    const payload = parsedFormData.get("payload");

    if (!operation) {
      return new Response("Invalid operation", { status: 400 });
    }
    return null;
  } catch (e) {
    console.error(e);
  }
};

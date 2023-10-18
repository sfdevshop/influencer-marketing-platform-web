import { redirect, type ActionFunction } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions.server";
import { ApiOps } from "~/types/ApiOps";

export const action: ActionFunction = async (args) => {
  try {
    const parsedFormData = await args.request.formData();
    const operation = parsedFormData.get("operation") as ApiOps;
    // const payload = parsedFormData.get("payload");
    if (!operation) {
      return new Response("Invalid operation", { status: 400 });
    }
    if (operation === ApiOps.LOGOUT) {
      const session = await getSession(args.request.headers.get("Cookie"));
      return redirect("/log-in", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }

    if (operation === ApiOps.DISCOVER) {
      return redirect("/discover-influencers");
    }

    // const result = await handleApiOperatons(args, operation, payload);

    return null;
  } catch (e) {
    console.error(e);
  }
};

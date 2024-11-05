// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import { createOrUpdateUser, deleteUser, UserProps } from "@/lib/actions/user";

// export async function POST(req: Request): Promise<Response> {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Helper function for error responses
//   const errorResponse = (message: string, status: number = 400) =>
//     new Response(JSON.stringify({ error: message }), {
//       status,
//       headers: { "Content-Type": "application/json" },
//     });

//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return errorResponse("Error occurred -- missing svix headers", 400);
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const wh = new Webhook(WEBHOOK_SECRET);
//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return errorResponse("Error verifying webhook", 400);
//   }

//   const eventType = evt.type;
//   console.log(`Webhook with ID ${evt.data.id} and type ${eventType}`);
//   console.log("Webhook body:", body);

//   if (eventType === "user.created" || eventType === "user.updated") {
//     const { id, first_name, last_name, image_url, email_addresses, username } =
//       evt.data as UserProps;

//     try {
//       const newUser = await createOrUpdateUser({
//         id,
//         first_name,
//         last_name,
//         image_url,
//         email_addresses,
//         username,
//       });

//       return new Response(
//         JSON.stringify({
//           message: "User created or updated",
//           newUser,
//         }),
//         { status: 200, headers: { "Content-Type": "application/json" } }
//       );
//     } catch (error) {
//       console.error("Error creating or updating user:", error);
//       return errorResponse("Error creating or updating user", 400);
//     }
//   }

//   if (eventType === "user.deleted") {
//     const { id } = evt.data as { id: string };

//     try {
//       await deleteUser(id);
//       return new Response(
//         JSON.stringify({
//           message: "User deleted",
//         }),
//         { status: 200, headers: { "Content-Type": "application/json" } }
//       );
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       return errorResponse("Error deleting user", 400);
//     }
//   }

//   // Return a generic 200 response for unhandled events
//   return new Response("", { status: 200 });
// }

// import { Webhook } from "svix";
// import { headers } from "next/headers";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import { createOrUpdateUser, deleteUser, UserProps } from "@/lib/actions/user";

// export async function POST(req: Request): Promise<Response> {
//   const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error(
//       "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
//     );
//   }

//   // Helper function for error responses
//   const errorResponse = (message: string, status: number = 400) =>
//     new Response(JSON.stringify({ error: message }), {
//       status,
//       headers: { "Content-Type": "application/json" },
//     });

//   const headerPayload = headers();
//   const svix_id = (await headerPayload).get("svix-id");
//   const svix_timestamp = (await headerPayload).get("svix-timestamp");
//   const svix_signature = (await headerPayload).get("svix-signature");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return errorResponse("Error occurred -- missing svix headers", 400);
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const wh = new Webhook(WEBHOOK_SECRET);
//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-timestamp": svix_timestamp,
//       "svix-signature": svix_signature,
//     }) as WebhookEvent;
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return errorResponse("Error verifying webhook", 400);
//   }

//   const eventType = evt.type;
//   console.log(`Webhook with ID ${evt.data.id} and type ${eventType}`);
//   console.log("Webhook body:", body);

//   if (eventType === "user.created" || eventType === "user.updated") {
//     // Safely map evt.data to UserProps
//     const userData = evt.data as unknown as {
//       id: string;
//       first_name: string;
//       last_name: string;
//       image_url: string;
//       email_addresses: { email: string }[];
//       username: string;
//     };

//     const userProps: UserProps = {
//       id: userData.id,
//       first_name: userData.first_name,
//       last_name: userData.last_name,
//       image_url: userData.image_url,
//       email_addresses: userData.email_addresses,
//       username: userData.username,
//     };

//     try {
//       const newUser = await createOrUpdateUser(userProps);

//       return new Response(
//         JSON.stringify({
//           message: "User created or updated",
//           newUser,
//         }),
//         { status: 200, headers: { "Content-Type": "application/json" } }
//       );
//     } catch (error) {
//       console.error("Error creating or updating user:", error);
//       return errorResponse("Error creating or updating user", 400);
//     }
//   }

//   if (eventType === "user.deleted") {
//     const { id } = evt.data as { id: string };

//     try {
//       await deleteUser(id);
//       return new Response(
//         JSON.stringify({
//           message: "User deleted",
//         }),
//         { status: 200, headers: { "Content-Type": "application/json" } }
//       );
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       return errorResponse("Error deleting user", 400);
//     }
//   }

//   // Return a generic 200 response for unhandled events
//   return new Response("", { status: 200 });
// }

import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createOrUpdateUser, deleteUser, UserProps } from "@/lib/actions/user";

export async function POST(req: Request): Promise<Response> {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const errorResponse = (message: string, status: number = 400) =>
    new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers");
    return errorResponse("Missing svix headers", 400);
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch (error) {
    console.error("Error parsing request body:", error);
    return errorResponse("Invalid JSON body", 400);
  }

  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err, {
      svix_id,
      svix_timestamp,
      svix_signature,
      body,
    });
    return errorResponse("Error verifying webhook", 400);
  }

  const eventType = evt.type;
  console.log(`Webhook with ID ${evt.data.id} and type ${eventType}`);
  console.log("Webhook body:", body);

  if (eventType === "user.created" || eventType === "user.updated") {
    const userData = evt.data as unknown as {
      id: string;
      first_name: string;
      last_name: string;
      image_url: string;
      email_addresses: { email: string }[];
      username: string;
    };

    const userProps: UserProps = {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      image_url: userData.image_url,
      email_addresses: userData.email_addresses,
      username: userData.username,
    };

    try {
      const newUser = await createOrUpdateUser(userProps);

      return new Response(
        JSON.stringify({
          message: "User created or updated",
          newUser,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error creating or updating user:", error);
      return errorResponse("Error creating or updating user", 400);
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data as { id: string };

    try {
      await deleteUser(id);
      return new Response(
        JSON.stringify({
          message: "User deleted",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      return errorResponse("Error deleting user", 400);
    }
  }

  return new Response("", { status: 200 });
}

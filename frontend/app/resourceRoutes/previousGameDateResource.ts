import type { LoaderFunctionArgs } from "react-router";
import { getPreviousMatchDayDate } from "~/services/nhlApiServices/previousMatchDayDateService";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const previousMatchDayDate: string = await getPreviousMatchDayDate(params.date);
    return new Response(JSON.stringify(previousMatchDayDate), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}

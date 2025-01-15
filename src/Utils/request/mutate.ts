import { callApi } from "@/Utils/request/query";
import { ApiCallOptions, ApiRoute } from "@/Utils/request/types";

/**
 * Creates a TanStack Query compatible mutation function.
 *
 * Example:
 * ```tsx
 * const { mutate: createPrescription, isPending } = useMutation({
 *   mutationFn: mutate(MedicineRoutes.createPrescription, {
 *     pathParams: { consultationId },
 *   }),
 *   onSuccess: () => {
 *     toast.success(t("medication_request_prescribed"));
 *   },
 * });
 * ```
 */
export default function mutate<Route extends ApiRoute<unknown, unknown>>(
  route: Route,
  options?: ApiCallOptions<Route>,
) {
  return (variables: Route["TBody"]) => {
    return callApi(route, { ...options, body: variables });
  };
}

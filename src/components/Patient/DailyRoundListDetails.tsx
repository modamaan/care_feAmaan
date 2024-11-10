import {
  Activity,
  FileText,
  Heart,
  Thermometer,
  Timer,
  Waves,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import ButtonV2 from "@/components/Common/ButtonV2";
import Loading from "@/components/Common/Loading";
import Page from "@/components/Common/Page";
import { DailyRoundsModel } from "@/components/Patient/models";

import routes from "@/Utils/request/api";
import useQuery from "@/Utils/request/useQuery";
import { formatDateTime } from "@/Utils/utils";

export const DailyRoundListDetails = (props: any) => {
  const { t } = useTranslation();
  const { facilityId, patientId, consultationId, id } = props;
  const [dailyRoundListDetailsData, setDailyRoundListDetails] =
    useState<DailyRoundsModel>({});

  const { loading: isLoading } = useQuery(routes.getDailyReport, {
    pathParams: { consultationId, id },
    onResponse: ({ data }) => {
      if (data) {
        setDailyRoundListDetails(data);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Page
      title={`Consultation Update #${id}`}
      backUrl={`/facility/${facilityId}/patient/${patientId}/consultation/${consultationId}/daily-rounds`}
    >
      <Card className="w-full max-w-8xl mx-auto my-5">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle>Patient Details</CardTitle>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div>
                <span className=" leading-relaxed text-md font-medium">
                  Patient Category:{" "}
                </span>
                <Badge variant={"secondary"}>
                  {dailyRoundListDetailsData.patient_category ?? "-"}
                </Badge>
              </div>
              <div className="text-sm">
                <span className=" text-muted-foreground text-md font-medium">
                  Taken at:{" "}
                </span>
                {dailyRoundListDetailsData.taken_at
                  ? formatDateTime(dailyRoundListDetailsData.taken_at)
                  : "-"}
              </div>
            </div>
          </div>

          <div>
            <div className="mt-2">
              <ButtonV2
                href={`/facility/${facilityId}/patient/${patientId}/consultation/${consultationId}/daily-rounds/${id}/update`}
              >
                Update Details
              </ButtonV2>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <Thermometer className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none mb-1">
                  Temperature:{" "}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dailyRoundListDetailsData.temperature ?? "-"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <Waves className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none mb-1">SpO2: </p>
                <p className="text-sm text-muted-foreground">
                  {dailyRoundListDetailsData.ventilator_spo2 ?? "-"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <Heart className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium leading-none mb-1">
                  Pulse (bpm):{" "}
                </p>
                <p className="text-sm text-muted-foreground">
                  {" "}
                  {dailyRoundListDetailsData.pulse ?? "-"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Blood Pressure</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium leading-none mb-1">
                  Systolic:{" "}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dailyRoundListDetailsData.bp?.systolic ?? "-"}
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm font-medium leading-none mb-1">
                  Diastolic:{" "}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dailyRoundListDetailsData.bp?.diastolic ?? "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Respiratory Information</h3>
              <div className="grid gap-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <Timer className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium leading-none mb-1">
                      Respiratory Rate (bpm):{" "}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dailyRoundListDetailsData.resp ?? "-"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium leading-none mb-1">
                      Rhythm:{" "}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dailyRoundListDetailsData.rhythm ?? "-"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium leading-none mb-1">
                      Rhythm Description:{" "}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {dailyRoundListDetailsData.rhythm_detail ?? "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Additional Information</h3>
              <div className="grid gap-4">
                <div className="rounded-lg border p-4">
                  <p className="text-sm font-medium leading-none mb-1">
                    Admitted To*:{" "}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dailyRoundListDetailsData.admitted_to ?? "-"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm font-medium leading-none mb-1">
                    Level of Consciousness:{" "}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    {(dailyRoundListDetailsData.consciousness_level &&
                      t(
                        `CONSCIOUSNESS_LEVEL__${dailyRoundListDetailsData.consciousness_level}`,
                      )) ||
                      "-"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm font-medium leading-none mb-1">
                    Other Details:{" "}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dailyRoundListDetailsData.other_details ?? "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm font-medium"> Physical Examination Info: </p>
            <p className="text-sm text-muted-foreground">
              {dailyRoundListDetailsData.physical_examination_info ?? "-"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Recommend Discharge: </span>
            <div>
              {" "}
              {dailyRoundListDetailsData.recommend_discharge ? (
                <span className="badge badge-pill badge-warning">Yes</span>
              ) : (
                <span className="badge badge-pill badge-secondary">No</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Page>
  );
};

import config from "@/keygen/config"
import client from "@/keygen/client"
import { ArtifactResponse } from "@/types/artifacts"

config.validate()

interface GetProps {
  id: string
}

export default async function get({ id }: GetProps): Promise<ArtifactResponse> {
  const result = (await client.request(
    `/accounts/${config.id}/artifacts/${id}`,
    {
      method: "GET",
      headers: {
        // NOTE: intentionally omitting "no-download" so the response includes
        // a presigned links.redirect for the Download button on this page.
        Prefer: "no-redirect",
      },
    },
  )) as ArtifactResponse

  return result
}

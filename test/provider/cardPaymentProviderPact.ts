import { Verifier } from "@pact-foundation/pact";
import path from "path";

describe("Pact Verification", () => {
  it("CardPaymentService should meet the pact with OrderService", async () => {
    const verifier = new Verifier({
      provider: "CardPaymentService",
      providerBaseUrl: "http://localhost:3000",
      pactBrokerUrl: "https://informa.pactflow.io",
      pactBrokerToken: "scBq4w8sDyYU6u25mOQZrg",
      publishVerificationResult: true,
      providerVersion: "2.0.0",
      pactUrls: [path.resolve(process.cwd(), "./pacts/OrderService-CardPaymentService.json")],
    });

    await verifier.verifyProvider().then(output => {
      console.log("Pact Verification Complete:", output);
    }).catch(error => {
      console.error("Pact Verification Failed:", error);
      process.exit(1);
    });
  });
});
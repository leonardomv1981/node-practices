import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmail();

    await email.send({
      from: "PointsControl <pointscontrolapp@gmail.com>",
      to: "teste@gmail.com",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });
    await email.send({
      from: "PointsControl <pointscontrolapp@gmail.com>",
      to: "teste@gmail.com",
      subject: "ultimo email enviado",
      text: "Teste de corpo do ultimo email.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<pointscontrolapp@gmail.com>");
    expect(lastEmail.recipients[0]).toBe("<teste@gmail.com>");
    expect(lastEmail.subject).toBe("ultimo email enviado");
    expect(lastEmail.text).toBe("Teste de corpo do ultimo email.\n");
  });
});

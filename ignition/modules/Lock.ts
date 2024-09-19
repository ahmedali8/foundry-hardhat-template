import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JAN_1ST_2030: number = 1893456000;
const ONE_GWEI: bigint = 1_000_000_000n;

export default buildModule("Lock", (m) => {
  const deployer = m.getAccount(0);

  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("Lock", [unlockTime], {
    from: deployer,
    value: lockedAmount,
  });

  return { lock };
});

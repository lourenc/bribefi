import React, { useCallback } from "react";
import styled from "styled-components";
import { Button, Title, Card } from "@gnosis.pm/safe-react-components";
import { useSafeAppsSDK } from "@gnosis.pm/safe-apps-react-sdk";

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Link = styled.a`
  margin-top: 8px;
`;

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK();

  const submitTx = useCallback(async () => {
    try {
      await sdk.txs
        .getBySafeTxHash(
          "0x340050cd1104e9dd61558ca1f33206d70d033e69f68e1c6e9336ca2428951e6c"
        )
        .then(console.info)
        .catch(console.error);
      // await sdk.txs.signMessage('Hello!').then(console.info).catch(console.error)

      // const { safeTxHash } = await sdk.txs.send({
      //   txs: [
      //     {
      //       to: safe.safeAddress,
      //       value: '0',
      //       data: '0x',
      //     },
      //   ],
      // })
      // console.log({ safeTxHash })

      // const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash)
      // console.log({ safeTx })
    } catch (e) {
      console.error(e);
    }
  }, [safe, sdk]);

  return (
    <Container>
      <div
        style={{
          marginBottom: "4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "20rem",
          margin: "0 auto",
        }}
      >
        <img style={{ width: "100%" }} src="/bribefi.png" alt="" />
      </div>
      <Title size="md">Bribe Taker</Title>

      <Title size="xs">Safe Account: {safe.safeAddress}</Title>

      <Card>
        <Title size="xs">Proposal: ETHGlobal Lisbon is awesome?</Title>
        <Title size="xs">Answer: Yes of course!</Title>
        <Title size="xs">Amount: 10</Title>

        <a
          href="https://snapshot.org/#/pas1ko.eth/proposal/0x51d0213598623143009319d15aeffe98a5f7fc2fca72320feecf5c2ec2f4255c"
          target="_blank"
        >
          Link
        </a>
      </Card>

      <Button
        size="lg"
        color="primary"
        onClick={submitTx}
        style={{ marginTop: "2rem" }}
      >
        Vote for this proposal and take bribe
      </Button>
    </Container>
  );
};

export default SafeApp;

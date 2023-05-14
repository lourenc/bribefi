import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Web3Button } from "@web3modal/react";
import {
  Button,
  Title,
  TextFieldInput,
  AddressInput,
} from "@gnosis.pm/safe-react-components";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { utils } from "ethers";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

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

const MakerApp = (): React.ReactElement => {
  const [propsalId, setProposalId] = useState("");
  const [bribeAmount, setBribeAmount] = useState("1");

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_blockNumber",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "_data",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
        ],
        name: "pushSigningRequest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "pushSigningRequest",
    args: [
      BigInt(17254716),
      "0x7b22617070223a22736e617073686f74222c2263686f696365223a2231222c2266726f6d223a22307834326232383339343037366464613230313337343835646137376535393338376531346439323264222c226d65746164617461223a227b7d222c2270726f706f73616c223a22307836626365396563316638333237393139326634613966373836353531643264663263333662303836333937363561346266393332613132306563643432633832222c22726561736f6e223a22222c227370616365223a22706173316b6f2e657468222c2274696d657374616d70223a2231363834303031323030227d",
      BigInt(10 * 10 ** 18),
    ],
    enabled: true,
  });

  const { write } = useContractWrite(config);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    console.info({ propsalId, bribeAmount });

    write?.();
  };

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

      <Web3Button />

      <Title size="md">Bribe Maker</Title>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "20rem",
          margin: "0 auto",
        }}
        onSubmit={handleSubmit}
      >
        <TextFieldInput
          label="Snapshot proposal ID"
          name="proposal_id"
          value={propsalId}
          onChange={(e) => setProposalId(e.target.value)}
          required
        />

        <TextFieldInput
          label="Bribe amount"
          name="amunt"
          value={bribeAmount}
          onChange={(e) => setBribeAmount(e.target.value)}
          required
          type="number"
          style={{ marginTop: "2rem" }}
        />

        <Button
          type="submit"
          size="lg"
          color="primary"
          style={{ marginTop: "2rem" }}
        >
          Submit Bribe
        </Button>
      </form>

      {/* <AddressInput label="Snapshot proposal ID" name="proposal_id" address={} onChangeAddress={handleChangeAddress} /> */}
    </Container>
  );
};

export default MakerApp;

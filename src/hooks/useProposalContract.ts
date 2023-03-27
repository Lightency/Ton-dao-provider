import { useEffect, useState } from 'react';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract } from 'ton-core';
import { Proposal } from '@/contracts/Proposal';

export function useProposalContract(address: string) {
  const client = useTonClient();
  const [proposal, setProposal] = useState<any>();

  const proposalContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Proposal(Address.parse(address));
    return client.open(contract) as OpenedContract<Proposal>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!proposalContract) {
        setProposal(null);
        return;
      }
      const id = await proposalContract.getProposalId();
      const type = await proposalContract.getProposalType();
      const status = await proposalContract.getProposalStatus();
      const proposerAccount = await (
        await proposalContract.getProposaerAccount()
      ).toString();
      const description = await proposalContract.getProposalDescription();
      const receiverAccount = await (
        await proposalContract.getReceiverAccount()
      ).toString();
      const submissionTime = await proposalContract.getSubmissionTime();
      const votesFor = await proposalContract.getVotesFor();
      const votesAgainst = await proposalContract.getVotesAgainst();

      const x = {
        id,
        type,
        status,
        proposerAccount,
        description,
        receiverAccount,
        submissionTime,
        votesFor,
        votesAgainst,
      };
      setProposal(x);
    }
    getValue();
  }, [proposalContract]);

  return {
    proposal: proposal,
  };
}

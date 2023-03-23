import {
  Address,
  beginCell,
  Cell,
  Contract,
  contractAddress,
  ContractProvider,
  crc32c,
  Dictionary,
  DictionaryValue,
  Sender,
  SendMode,
  Slice,
  toNano,
} from 'ton-core';
import { crc32, crc32str } from '../utils/crc32';

export type ProposalConfig = {
  dao_address: Address;
  proposal_id: number;
  proposal_type: number;
  proposer_account: Address;
  proposal_status: string;
  proposal_description: string;
  receiver_account: Address;
  submission_time: number;
  voters_list: Dictionary<number, string>;
  votes_for: number;
  votes_against: number;
};

const ListValue: DictionaryValue<string> = {
  serialize(src: string, builder: any) {
    builder.storeStringRefTail(src);
  },
  parse(src: any) {
    return src.loadStringRefTail();
  },
};

export function proposalConfigToCell(config: ProposalConfig): Cell {
  return beginCell()
    .storeAddress(config.dao_address)
    .storeUint(config.proposal_id, 16)
    .storeUint(config.proposal_type, 8)
    .storeAddress(config.proposer_account)
    .storeStringRefTail(config.proposal_status)
    .storeStringRefTail(config.proposal_description)
    .storeAddress(config.receiver_account)
    .storeUint(config.submission_time, 64)
    .storeDict(config.voters_list)
    .storeUint(config.votes_for, 16)
    .storeUint(config.votes_against, 16)
    .endCell();
}

export function decodeConfig(cell: Cell): ProposalConfig {
  let slice = cell.beginParse();
  return {
    dao_address: slice.loadAddress(),
    proposal_id: slice.loadUint(16),
    proposal_type: slice.loadUint(8),
    proposer_account: slice.loadAddress(),
    proposal_status: slice.loadStringTail(),
    proposal_description: slice.loadStringTail(),
    receiver_account: slice.loadAddress(),
    submission_time: slice.loadUint(64),
    voters_list: slice.loadDict(Dictionary.Keys.Uint(256), ListValue),
    votes_for: slice.loadUint(16),
    votes_against: slice.loadUint(16),
  };
}

export class Proposal implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new Proposal(address);
  }

  static createFromConfig(config: ProposalConfig, code: Cell, workchain = 0) {
    const data = proposalConfigToCell(config);
    const init = { code, data };
    return new Proposal(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async sendVoteFor(
    provider: ContractProvider,
    via: Sender,
    opts: {
      position: number;
      address: string;
    }
  ) {
    const messageBody = beginCell()
      .storeUint(crc32str('op::add_vote_for'), 32)
      .storeUint(0, 64) // query id
      .storeUint(opts.position, 256)
      .storeStringRefTail(opts.address)
      .endCell();

    await provider.internal(via, {
      value: toNano('0.05'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: messageBody,
    });
  }

  async sendVoteAgainst(
    provider: ContractProvider,
    via: Sender,
    opts: {
      position: number;
      address: string;
    }
  ) {
    const messageBody = beginCell()
      .storeUint(crc32str('op::add_vote_against'), 32)
      .storeUint(0, 64) // query id
      .storeUint(opts.position, 256)
      .storeStringRefTail(opts.address)
      .endCell();

    await provider.internal(via, {
      value: toNano('0.05'),
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: messageBody,
    });
  }

  async getDaoAddress(provider: ContractProvider) {
    return (await provider.get('get_dao_address', [])).stack.readAddress();
  }

  async getProposalId(provider: ContractProvider) {
    return (await provider.get('get_proposal_id', [])).stack.readNumber();
  }

  async getProposalType(provider: ContractProvider) {
    return (await provider.get('get_proposal_type', [])).stack.readNumber();
  }

  async getProposaerAccount(provider: ContractProvider) {
    return (await provider.get('get_proposer_account', [])).stack.readAddress();
  }

  async getProposalStatus(provider: ContractProvider) {
    return (await provider.get('get_proposal_status', [])).stack.readString();
  }

  async getProposalDescription(provider: ContractProvider) {
    return (
      await provider.get('get_proposal_description', [])
    ).stack.readString();
  }

  async getReceiverAccount(provider: ContractProvider) {
    return (await provider.get('get_receiver_account', [])).stack.readAddress();
  }

  async getSubmissionTime(provider: ContractProvider) {
    return (await provider.get('get_submission_time', [])).stack.readNumber();
  }

  async getVotersList(provider: ContractProvider) {
    return (await provider.get('get_voters_list', [])).stack.readCell();
  }

  async getVotesFor(provider: ContractProvider) {
    return (await provider.get('get_votes_for', [])).stack.readNumber();
  }

  async getVotesAgainst(provider: ContractProvider) {
    return (await provider.get('get_votes_against', [])).stack.readNumber();
  }
}
//first proposal: EQBY4Uc4CMn_HCniz_hNWPODpVo63BW4BinhfYs_nHakkCXM

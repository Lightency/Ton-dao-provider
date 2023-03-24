import { useEffect, useState } from 'react';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, Dictionary, DictionaryValue } from 'ton-core';
import { Dao } from '@/contracts/Dao';

const ListValue: DictionaryValue<string> = {
  serialize(src: string, builder) {
    builder.storeStringRefTail(src);
  },
  parse(src) {
    return src.loadStringRefTail();
  },
};

export function useDaoContract(address: string) {
  const client = useTonClient();
  const [dao, setDao] = useState<any>();

  const daoContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Dao(Address.parse(address));
    return client.open(contract) as OpenedContract<Dao>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!daoContract) return;
      setDao(null);
      const name = await daoContract.getDaoName();
      const purpose = await daoContract.getDaoPurpose();
      const creationTime = await daoContract.getDaoCreationTime();
      const daoMembersList = await daoContract.getMembersList();
      let slice1 = daoMembersList.beginParse();
      let membersList = slice1
        .loadDictDirect(Dictionary.Keys.Uint(256), ListValue)
        .values();
      slice1.endParse();
      const daoProposalsList = await daoContract.getProposalsList();
      let slice2 = daoProposalsList.beginParse();
      let proposalsList = slice2
        .loadDictDirect(Dictionary.Keys.Uint(256), ListValue)
        .values();
      slice2.endParse();
      const x = {
        name,
        purpose,
        creationTime,
        membersList,
        proposalsList,
      };
      setDao(x);
    }
    getValue();
  }, [daoContract]);

  return {
    dao: dao,
  };
}

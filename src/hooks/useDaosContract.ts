import { useEffect, useState } from 'react';
import { Daos } from '../contracts/Daos';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract, Dictionary, DictionaryValue } from 'ton-core';

const ListValue: DictionaryValue<string> = {
  serialize(src: string, builder) {
    builder.storeStringRefTail(src);
  },
  parse(src) {
    return src.loadStringRefTail();
  },
};

export function useFactoryContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | String[]>();

  const factoryContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Daos(
      Address.parse('EQCm2KaWFAWN-v22vYhZW_TTaks-v_VQ5FMay9rv8aHQMgqR')
    );
    return client.open(contract) as OpenedContract<Daos>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!factoryContract) return;
      setVal(null);
      const val = await factoryContract.getDaosList();
      let slice = val.beginParse();
      let list = slice
        .loadDictDirect(Dictionary.Keys.Uint(256), ListValue)
        .values();
      slice.endParse();
      setVal(list);
    }
    getValue();
  }, [factoryContract]);

  return {
    value: val,
    address: factoryContract?.address.toString(),
  };
}

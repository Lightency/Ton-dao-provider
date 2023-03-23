import { useEffect, useState } from 'react';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract } from 'ton-core';
import { Dao } from '@/contracts/Dao';

export function useDaoContract(address: string) {
  const client = useTonClient();
  const [dao, setDao] = useState<any>();

  const daoContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Dao(
      Address.parse(address) // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Dao>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!daoContract) return;
      setDao(null);
      const daoName = await daoContract.getDaoName();
      const x = {
        daoName: daoName,
      };
      setDao(x);
    }
    getValue();
  }, [daoContract]);

  return {
    value: dao,
    address: daoContract?.address.toString(),
  };
}

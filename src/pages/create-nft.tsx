import { useContext } from 'react';
import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import InputLabel from '@/components/ui/input-label';
import { WalletTonContext } from '@/lib/hooks/use-connect-ton';
import { useModal } from '@/components/modal-views/context';
import SelectWallet from '@/components/nft/select-wallet';

const CreateNFTPage: NextPageWithLayout = () => {
  const { isConnected } = useContext(WalletTonContext);
  const { openModal } = useModal();

  return (
    <>
      {isConnected ? (
        <>
          <NextSeo
            title="Create NFT"
            description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
          />
          <div className="mx-auto w-full px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
            <h2 className="mb-6 text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-10 sm:text-2xl">
              Create New DAO
            </h2>
            {/* DAO Name */}
            <div className="mb-8">
              <InputLabel title="DAO Name" important />
              <Input type="text" placeholder="DAO Name" />
            </div>
            {/* Purpose */}
            <div className="mb-8">
              <InputLabel
                title="Purpose"
                subTitle="The description will be included on the item's detail page underneath its image."
              />
              <Textarea placeholder="Provide a detailed description of your item" />
            </div>
            <Button shape="rounded">CREATE</Button>
          </div>
        </>
      ) : (
        <>
          <SelectWallet />
        </>
      )}
    </>
  );
};

CreateNFTPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateNFTPage;

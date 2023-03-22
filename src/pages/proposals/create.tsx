import type { NextPageWithLayout } from '@/types';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import routes from '@/config/routes';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import { ExportIcon } from '@/components/icons/export-icon';
import { Close as CloseIcon } from '@/components/icons/close';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Listbox, { ListboxOption } from '@/components/ui/list-box';
// static data
import votePool from '@/assets/images/vote-pool.svg';
import { WalletContext } from '@/lib/hooks/use-connect';
import { WalletTonContext } from '@/lib/hooks/use-connect-ton';
import { useSelector } from 'react-redux';
import { AddProposalFunction } from '@/reducers/proposal';
import { useDispatch } from 'react-redux';

const actionOptions = [
  {
    name: 'Propose Transfer',
    value: 'Propose_Transfer',
  },
  {
    name: 'Propose to Add Member',
    value: 'Propose_Member',
  },
];

const reserveOptions = [
  {
    name: 'Renounce Ownership',
    value: 'renounceOwnership',
  },
  {
    name: 'Set Rate Mantissa',
    value: 'setRateMantissa',
  },
  {
    name: 'Transfer Ownership',
    value: 'transferOwnership',
  },
  {
    name: 'Withdraw Reverse',
    value: 'withdrawReverse',
  },
];

const cripticTokenOptions = [
  {
    name: 'Approve',
    value: 'approve',
  },
  {
    name: 'Delegated',
    value: 'delegated',
  },
  {
    name: 'Mint',
    value: 'mint',
  },
  {
    name: 'Set Minter',
    value: 'setMinter',
  },
  {
    name: 'Transfer',
    value: 'transfer',
  },
  {
    name: 'Transfer From',
    value: 'transferFrom',
  },
];

function CripticTokenAction({
  selectedOption,
  onChange,
}: {
  selectedOption: ListboxOption;
  onChange: React.Dispatch<React.SetStateAction<ListboxOption>>;
}) {
  return (
    <>
      <Listbox
        className="w-full sm:w-80"
        options={cripticTokenOptions}
        selectedOption={selectedOption}
        onChange={onChange}
      />
      {selectedOption.value === 'approve' && (
        <>
          <Input
            label="Spender address"
            useUppercaseLabel={false}
            placeholder="Enter spender address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
        </>
      )}
      {selectedOption.value === 'delegated' && (
        <Input
          label="Delegated address"
          useUppercaseLabel={false}
          placeholder="Enter delegated address"
          className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
        />
      )}
      {selectedOption.value === 'mint' && (
        <>
          <Input
            label="Dst address"
            useUppercaseLabel={false}
            placeholder="Enter dst address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
        </>
      )}
      {selectedOption.value === 'setMinter' && (
        <Input
          label="Minter address"
          useUppercaseLabel={false}
          placeholder="Enter minter address"
          className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
        />
      )}
      {selectedOption.value === 'transfer' && (
        <>
          <Input
            label="Dst address"
            useUppercaseLabel={false}
            placeholder="Enter dst address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
        </>
      )}
      {selectedOption.value === 'transferFrom' && (
        <>
          <Input
            label="Src address"
            useUppercaseLabel={false}
            placeholder="Enter src address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Dst address"
            useUppercaseLabel={false}
            placeholder="Enter dst address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
        </>
      )}
    </>
  );
}
function DaoAction({
  selectedOption,
  onChange,
}: {
  selectedOption: ListboxOption;
  onChange: React.Dispatch<React.SetStateAction<ListboxOption>>;
}) {
  return (
    <>
      <Listbox
        className="w-full sm:w-80"
        options={cripticTokenOptions}
        selectedOption={selectedOption}
        onChange={onChange}
      />
    </>
  );
}
function ActionFields() {
  let [actionType, setActionType] = useState(actionOptions[0]);
  let [reserveAction, setReserveAction] = useState(reserveOptions[0]);
  let [cripticTokenAction, setCripticTokenAction] = useState(
    cripticTokenOptions[0]
  );
  // const { address, disconnectWallet, balance } = useContext(WalletContext);
  const { isConnected, walletConfig, balance, disconnectWallet } =
    useContext(WalletTonContext);
  return (
    <div className="">
      <div className="group rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
        <h1>Dao Name</h1>
        <DaoAction
          selectedOption={cripticTokenAction}
          onChange={setCripticTokenAction}
        />
        <div className="-mr-2  flex items-center justify-between">
          <h1> Proposal Type </h1>
          <Button
            type="button"
            size="mini"
            shape="circle"
            variant="transparent"
            className="opacity-0 group-hover:opacity-100"
          >
            {/* <CloseIcon className="h-auto w-[11px] xs:w-3" /> */}
          </Button>
        </div>
        <>
          <Listbox
            className="mb-2 w-full sm:w-80"
            options={actionOptions}
            selectedOption={actionType}
            onChange={setActionType}
          />
          {actionType.value === 'Propose_Transfer' && (
            <>
              {/* <Input
                className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
                useUppercaseLabel={false}
                placeholder="Enter contact address 0x1f9840a85..."
              /> */}
              {walletConfig && (
                <>
                  <div className="mb-2">
                    <h1>Proposer</h1>

                    <Input placeholder={walletConfig.address} />
                  </div>
                </>
              )}
              <div className="mb-2">
                <h1>Description </h1>
                <Textarea
                  placeholder="Add the proposal details here"
                  inputClassName="md:h-32 xl:h-36"
                />
              </div>
              <div className="mb-2">
                <h1>Amount</h1>

                <Input placeholder="Enter your Amount" />
              </div>
              <div className="mb-2">
                <h1>Target</h1>

                <Input placeholder="Target" />
              </div>
            </>
          )}
          {actionType.value === 'Propose_Member' && (
            <>
              <div className="mb-2">
                {walletConfig && (
                  <>
                    <div className="mb-2">
                      <h1>Proposer</h1>

                      <Input placeholder={walletConfig.address} />
                    </div>
                  </>
                )}
                <h1>Description</h1>
                <Textarea
                  placeholder="Add the proposal details here"
                  inputClassName="md:h-32 xl:h-36"
                />
              </div>

              <div className="mb-2">
                <h1>Target</h1>

                <Input placeholder="Target" />
              </div>
            </>
          )}
          {actionType.value === 'reserve' && (
            <div className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12">
              <Listbox
                className="w-full sm:w-80"
                options={reserveOptions}
                selectedOption={reserveAction}
                onChange={setReserveAction}
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
}
const AddNewProposalAction = async (dispatch: any) => {
  return await dispatch(AddProposalFunction({})).unwrap();
};
const CreateProposalPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  function goToAllProposalPage() {
    setTimeout(() => {
      router.push(routes.home);
    }, 800);
  }
  useEffect(() => {
    AddNewProposalAction(dispatch);
  }, []);
  return (
    <>
      <NextSeo
        title="Create Proposal"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <section className="mx-auto w-full max-w-[1160px] text-sm sm:pt-10 4xl:py-16">
        <header className="mb-10 flex flex-col gap-4 rounded-lg bg-white p-5 py-6 shadow-card dark:bg-light-dark xs:p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4 xs:gap-3 xl:gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-dark">
              <Image alt="Vote Pool" src={votePool} width={32} height={32} />
            </div>
            <div>
              <h2 className="mb-2 text-base font-medium uppercase dark:text-gray-100 xl:text-lg">
                You have 100 votes
              </h2>
              <p className="leading-[1.8] text-gray-600 dark:text-gray-400">
                In order to submit a proposal you must have at least 10,000
                CRIPTIC tokens <br className="hidden xl:inline-block" />{' '}
                delegated to you{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://medium.com/pooltogether/governance-101-fca9ab8b8ba2"
                  className="inline-flex items-center gap-2 text-gray-900 underline transition-opacity duration-200 hover:no-underline hover:opacity-90 dark:text-gray-100"
                >
                  Learn more <ExportIcon className="h-auto w-3" />
                </a>
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Button
              shape="rounded"
              fullWidth={true}
              className="uppercase"
              onClick={() => goToAllProposalPage()}
            >
              All Proposal
            </Button>
          </div>
        </header>

        <h2 className="mb-5 text-lg font-medium dark:text-gray-100 sm:mb-6 lg:mb-7 xl:text-xl">
          Create a new proposal
        </h2>
        <div className="mb-6 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xs:pb-8">
          <ActionFields />
        </div>
        <div className="mt-6">
          <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="xs:w-64 md:w-72"
          >
            Create Proposal
          </Button>
        </div>
      </section>
    </>
  );
};

CreateProposalPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateProposalPage;

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import VoteList from '@/components/vote/vote-list';
import { TabPanel } from '@/components/ui/tab';
import { getVotesByStatus } from '@/data/static/vote-data';
import routes from '@/config/routes';
import { ExportIcon } from '@/components/icons/export-icon';
import ParamTab from '@/components/ui/param-tab';
import Button from '@/components/ui/button/button';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { WalletContext } from '@/lib/hooks/use-connect';
import CoinSlider from '@/components/ui/coin-card';
import { coinSlideData } from '@/data/static/coin-slide-data';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import VolumeChart from '@/components/ui/chats/volume-chart';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';
import OverviewChart from '@/components/ui/chats/overview-chart';
import TopPools from '@/components/ui/top-pools';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { address, disconnectWallet, balance } = useContext(WalletContext);

  const router = useRouter();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');

  function goToCreateProposalPage() {
    setTimeout(() => {
      router.push(routes.createProposal);
    }, 800);
  }
  return (
    <>
      <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-3">
        <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
          {/* <Avatar
              image={AuthorImage}
              alt="Author"
              className="mx-auto mb-6"
              size="lg"
            /> */}
          <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
            Total Proposal{' '}
          </h3>
          <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            25{' '}
          </div>
        </div>
        <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
          {/* <Avatar
              image={AuthorImage}
              alt="Author"
              className="mx-auto mb-6"
              size="lg"
            /> */}
          <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
            Total Dao's{' '}
          </h3>
          <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            9{' '}
          </div>
        </div>
        <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
          {/* <Avatar
              image={AuthorImage}
              alt="Author"
              className="mx-auto mb-6"
              size="lg"
            /> */}
          <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
            Users{' '}
          </h3>
          <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
            30{' '}
          </div>
        </div>
      </div>
      <NextSeo
        title="Proposal"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />

      <section className="mx-auto w-full max-w-[1160px] text-sm sm:pt-10 4xl:pt-14">
        {address ? (
          <div className="shrink-0">
            <Button
              shape="rounded"
              fullWidth={true}
              className="uppercase"
              onClick={() => goToCreateProposalPage()}
            >
              Create Proposal
            </Button>
          </div>
        ) : (
          <></>
        )}
        <ParamTab
          tabMenu={[
            {
              title: (
                <>
                  ALL Proposal{' '}
                  {totalActiveVote > 0 && (
                    <span className="ltr:ml-0.5 rtl:mr-0.5 ltr:md:ml-1.5 rtl:md:mr-1.5 ltr:lg:ml-2 rtl:lg:mr-2">
                      {totalActiveVote}
                    </span>
                  )}
                </>
              ),
              path: 'active',
            },
          ]}
        >
          <TabPanel className="focus:outline-none">
            <VoteList voteStatus={'active'} />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <>
              <div className="mb-6 rounded-lg border-2 border-gray-900 bg-white p-5 dark:border-gray-700 dark:bg-light-dark xs:py-6 lg:px-8 lg:py-6">
                <div className="mb-3 flex flex-col gap-3 xs:mb-4 sm:gap-4 md:flex-row md:items-center md:justify-between">
                  <h3 className="flex items-center gap-4 text-base font-semibold dark:text-gray-100">
                    <span className="inline-block rounded-3xl bg-gray-900 px-2.5 py-0.5 text-sm font-medium text-white">
                      Tip
                    </span>{' '}
                    Vote gas-free + earn rewards
                  </h3>
                  <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://snapshot.org/#/"
                      className="inline-flex items-center gap-2 text-gray-900 transition-opacity duration-200 hover:underline hover:opacity-90 dark:text-gray-100"
                    >
                      Go to Snapshot <ExportIcon className="h-auto w-3" />
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="#"
                      className="inline-flex items-center gap-2 text-gray-900 transition-opacity duration-200 hover:underline hover:opacity-90 dark:text-gray-100"
                    >
                      Learn more <ExportIcon className="h-auto w-3" />
                    </a>
                  </div>
                </div>
                <p className="leading-loose text-gray-600 dark:text-gray-400">
                  In order to vote on SnapShot, you need to have ptPOOL tokens.
                  You can obtain them by depositing your token icon POOL into
                  the POOL Pool . By doing so, you will be eligible to vote
                  gas-free and have a chance to win a weekly prize.
                </p>
              </div>
              <VoteList voteStatus={'off-chain'} />
            </>
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <VoteList voteStatus={'executable'} />
          </TabPanel>
          <TabPanel className="focus:outline-none">
            <VoteList voteStatus={'past'} />
          </TabPanel>
        </ParamTab>
      </section>
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HomePage;

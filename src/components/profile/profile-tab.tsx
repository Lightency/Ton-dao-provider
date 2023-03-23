import ParamTab from '@/components/ui/param-tab';
import ListCard from '@/components/ui/list-card';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/transaction-history';
import CollectionCard from '@/components/ui/collection-card';
// static data
import { TabPanel } from '@/components/ui/tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';

import { collections } from '@/data/static/collections';
import {
  authorWallets,
  authorNetworks,
  authorProtocols,
} from '@/data/static/author-profile';
import LiquidityChart from '../ui/chats/liquidity-chart';
import VolumeChart from '../ui/chats/volume-chart';
import { getVotesByStatus } from '@/data/static/vote-data';

export default function ProfileTab() {
  const { totalVote: totalActiveVote } = getVotesByStatus('active');

  return (
    <ParamTab
      tabMenu={[
        {
          title: 'proposels list',
          path: 'collection',
        },
        {
          title: 'Funds',
          path: 'portfolio',
        },
      ]}
    >
      <TabPanel className="focus:outline-none">
        <div>
          {/*<LiquidityChart />
        <VolumeChart />*/}
          <ParamTab
            tabMenu={[
              {
                title: (
                  <>
                    ALL Proposal{' '}
                    {totalActiveVote > 0 && <span>{totalActiveVote}</span>}
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
                    In order to vote on SnapShot, you need to have ptPOOL
                    tokens. You can obtain them by depositing your token icon
                    POOL into the POOL Pool . By doing so, you will be eligible
                    to vote gas-free and have a chance to win a weekly prize.
                  </p>
                </div>
                <VoteList voteStatus={'off-chain'} />
              </>
            </TabPanel>
          </ParamTab>
        </div>
      </TabPanel>
      <TabPanel className="focus:outline-none">
        <div className="space-y-8 md:space-y-10 xl:space-y-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {authorWallets?.map((wallet) => (
              <ListCard item={wallet} key={wallet?.id} variant="medium" />
            ))}
          </div>
        </div>
      </TabPanel>
    </ParamTab>
  );
}

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import AuthorInformation from '@/components/author/author-information';
import ProfileTab from '@/components/profile/profile-tab';
import Avatar from '@/components/ui/avatar';
// static data
import { authorData } from '@/data/static/author';
import { useRouter } from 'next/router';
import { useDaoContract } from '@/hooks/useDaoContract';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const AuthorProfilePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const router = useRouter();
  const address =
    typeof router.query.address === 'string' ? router.query.address : '';
  const { dao } = useDaoContract(address);
  return (
    <>
      {dao && (
        <>
          <NextSeo
            title="Profile"
            description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
          />
          {/* Profile Cover Image */}
          <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[100px]"></div>

          {/* Profile Container */}
          <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
            {/* Profile Image */}
            <Avatar
              size="xl"
              image={authorData?.avatar?.thumbnail}
              alt="Author"
              className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
            />
            {/* Profile Info */}
            <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row xl:pt-12">
              <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 xl:ltr:pr-14 xl:rtl:pl-14 2xl:w-80 3xl:w-96 3xl:ltr:pr-16 3xl:rtl:pl-16">
                <div className="text-center ltr:md:text-left rtl:md:text-right">
                  {/* Name */}
                  <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
                    {dao.name}
                  </h2>
                </div>

                {/* Followers, Following and follow button */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-y border-dashed border-gray-200 py-5 text-center dark:border-gray-700 md:justify-start ltr:md:text-left rtl:md:text-right xl:mt-12 xl:gap-8 xl:py-6">
                  <div>
                    <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-900 dark:text-white">
                      {dao.membersList.length}{' '}
                    </div>
                    <div className="text-sm tracking-tighter text-gray-600 dark:text-gray-400">
                      Members
                    </div>
                  </div>

                  <div>
                    <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-900 dark:text-white">
                      3.3{' '}
                    </div>
                    <div className="text-sm tracking-tighter text-gray-600 dark:text-gray-400">
                      DAO Version
                    </div>
                  </div>
                </div>

                <AuthorInformation className="hidden md:block" data={dao} />
              </div>

              <div className="grow pt-6 pb-9 md:-mt-2.5 md:pt-1.5 md:pb-0 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-16 3xl:rtl:pr-16">
                <ProfileTab />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

AuthorProfilePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AuthorProfilePage;

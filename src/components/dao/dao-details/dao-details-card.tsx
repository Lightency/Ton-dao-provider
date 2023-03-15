import { useState } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import Button from '@/components/ui/button';
import { useRouter } from 'next/router';
import routes from '@/config/routes';

// FIXME: need to add vote type
export default function DaoDetailsCard({ dao }: any) {
  const router = useRouter();
  function goToDAODetailsPage() {
    setTimeout(() => {
      router.push(routes.profile);
    }, 800);
  }
  return (
    <motion.div
      layout
      initial={{ borderRadius: 8 }}
      className={cn(
        'mb-3 rounded-lg bg-white p-5 transition-shadow duration-200 dark:bg-light-dark xs:p-6',
        'shadow-card hover:shadow-large'
      )}
    >
      <motion.div
        layout
        className="flex w-full flex-col-reverse justify-between md:grid md:grid-cols-3"
      >
        <div className="self-start md:col-span-2">
          <h3 className="cursor-pointer text-base font-medium leading-normal dark:text-gray-100 2xl:text-lg">
            {dao.title}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Dao #{dao.id}</p>
          <h4 className="mt-2 mb-6 uppercase dark:text-gray-100">
            Description
          </h4>

          <div
            className="dynamic-html grid gap-2 leading-relaxed text-gray-600 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: dao.description }}
          />
          <Button
            onClick={() => goToDAODetailsPage()}
            className="mt-4 w-full xs:mt-6 xs:w-auto md:mt-10"
            shape="rounded"
          >
            Details
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import Uploader from '~/components/uploader';

const Home: NextPageWithLayout = () => {
	return (
		<div className='mx-auto flex max-w-screen-sm flex-col gap-16 py-16'>
			<div className='text-5xl'>Irys Uploader</div>
			<Uploader />
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;

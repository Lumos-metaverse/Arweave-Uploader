import React from 'react';
import {
	ThirdwebProvider,
	metamaskWallet,
	coinbaseWallet,
	localWallet,
} from '@thirdweb-dev/react';
import { Ethereum, Polygon, Mumbai, Sepolia } from '@thirdweb-dev/chains';

// Metadata
import { dAppMetadata } from 'config';

import { env } from '~/env.mjs';

const { NEXT_PUBLIC_TW_CLIENT_ID } = env;

interface Props {
	children: React.ReactNode;
}

const Web3Provider = ({ children }: Props) => {
	return (
		<ThirdwebProvider
			clientId={NEXT_PUBLIC_TW_CLIENT_ID}
			activeChain={Mumbai}
			supportedChains={[Ethereum, Polygon, Mumbai, Sepolia]}
			dAppMeta={dAppMetadata}
			supportedWallets={[metamaskWallet(), coinbaseWallet(), localWallet()]}
		>
			{children}
		</ThirdwebProvider>
	);
};

export default Web3Provider;

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { WebIrys } from '@irys/sdk';
import { providers } from 'ethers';

const useIrys = () => {
	const getIrys = async () => {
		await window.ethereum.enable();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const provider = new providers.Web3Provider(window.ethereum);
		const wallet = { name: 'ethersv5', provider: provider };
		const url = 'https://devnet.irys.xyz';
		const token = 'ethereum';
		const webIrys = new WebIrys({ url, token, wallet });
		console.log(webIrys);
		await webIrys.ready();
		return webIrys;
	};

	const fundAndUpload = async (file: File) => {
		const irys = await getIrys();
		console.log(irys);
		const requiredTokens = irys.utils.fromAtomic(
			await irys.getPrice(file.size + 10000)
		);
		const loadedBalance = irys.utils.fromAtomic(await irys.getLoadedBalance());

		if (requiredTokens.gt(loadedBalance)) {
			const amountToFund = requiredTokens.minus(loadedBalance);
			await irys.fund(irys.utils.toAtomic(amountToFund));
		}

		const tags = [
			{ name: 'Content-Type', value: file.type },
			{
				name: 'Title',
				value: file.name,
			},
		];

		const response = await irys.uploadFile(file, {
			tags,
		});

		return response.id;
	};
	return { getIrys, fundAndUpload };
};

export default useIrys;

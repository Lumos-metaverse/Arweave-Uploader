import React from 'react';
import { Upload } from 'antd';
import clsx from 'clsx';
import { Button } from 'antd';
import Link from 'next/link';
import { useIrys } from '~/hooks';

// Icons
import { PiUploadSimple } from 'react-icons/pi';

// Types
import type { UploadProps, UploadFile } from 'antd';

const { Dragger } = Upload;

const Uploader = () => {
	const { fundAndUpload } = useIrys();
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);
	const [txId, setTxId] = React.useState<string>('');

	const props: UploadProps = {
		name: 'file',
		multiple: false,
		fileList,
		listType: 'picture',
		beforeUpload: (file) => {
			setFileList([file]);

			return false;
		},
		onRemove: () => {
			setFileList([]);
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	const upload = async () => {
		const file = fileList[0];
		if (!file) return;
		console.log(file);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const response = await fundAndUpload(file as unknown as File);
		setTxId(response);
	};
	return (
		<div className='flex flex-col gap-3 dark:text-gray-200'>
			<div className='text-2xl font-medium'>Upload Content</div>
			<div>Drag or choose your file to Upload</div>
			<Dragger
				{...props}
				prefixCls=''
				rootClassName={clsx(fileList.length && 'mb-24')}
			>
				<div className='group flex flex-col items-center justify-center gap-4 rounded-xl py-16'>
					<div>
						<PiUploadSimple className='text-[3rem]' />
					</div>
					<div className='max-w-xs whitespace-pre-wrap text-[1rem]'>
						PNG, TXT, ZIP, MP4,etc. (Supports all formats).
					</div>
				</div>
			</Dragger>
			<div className='flex justify-end'>
				<Button
					type='primary'
					className='bg-blue-400'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={upload}
				>
					Upload
				</Button>
			</div>
			<div className='text-xl font-medium'>Transaction ID: </div>
			<Link
				href={`https:/arweave.net/${txId}`}
				className='text-[1rem]'
				target='_blank'
			>
				{txId}
			</Link>
		</div>
	);
};

export default Uploader;

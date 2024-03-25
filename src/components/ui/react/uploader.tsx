import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { uploadItem } from '@/utilities/helpers/s3config';

export const FileUploader = () => {

    const getUploadParams = async ({ file, meta: { name } }) => {
        const { uploadUrl } = await uploadItem({ bucketName: "active-public-pol-ref-directory", itemName: name });
        return { body: file, meta: { name }, url: uploadUrl }
    }

    let data = [];
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }: any, status: string, files: any[]) => {
        switch (status) {
            case 'done':
                files.forEach((file) => {
                    const fileData = {
                        name: file.meta.name,
                        size: file.meta.size,
                        path: file.meta.name.replace(/[_\s]/g, '_').toLowerCase()
                    };

                    if (!data.some(item => item.name === fileData.name && item.size === fileData.size && item.path === fileData.path)) {
                        data.push(fileData);
                    }
                });
                window.localStorage.setItem("@files", JSON.stringify(data));
                break;
            default:
                break;
        }

    }

    // const handleSubmit = async (files, allFiles) => {
    //     allFiles.forEach(f => f.remove());
    //     const uploadedFiles = files.map(file => ({
    //         name: file.meta.name,
    //         size: file.meta.size,
    //         type: file.meta.type,
    //         status: file.meta.status,
    //     }));
    //     console.log('Uploaded Files:', uploadedFiles);
    //     // You can perform further actions with the uploadedFiles array here, such as sending it to a backend server
    // }

    return (
        <>
            <Dropzone
                getUploadParams={getUploadParams}
                onChangeStatus={handleChangeStatus}
                autoUpload={true}
                accept=".pdf, .png, .jpeg, .jpg, .doc, .docx, .xml, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                classNames={{
                    dropzone: 'w-full min-h-40 relative bg-white/60 dark:bg-background-color border rounded-md px-2 py-4 !text-foreground',
                    preview: 'flex justify-between !text-foreground h-8 w-full px-2 text-xs ',
                    previewImage: 'text-foreground',
                }}
            />
        </>

    )
}

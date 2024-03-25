import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'


export const UserFileUploader = () => {
    let data = [];
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }: any, status: string, files: any[]) => {
        if (status === 'done') {
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
            window.localStorage.setItem("@user-files", JSON.stringify(data));
        }
    }
    return (
        <Dropzone
            onChangeStatus={handleChangeStatus}
            accept=".pdf, .png, .jpeg, .jpg .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            classNames={{
                dropzone: 'w-full min-h-40 relative bg-white/60 dark:bg-background-color border rounded-md px-2 py-4 !text-foreground',
                preview: 'flex justify-between !text-foreground h-8 w-full px-2 text-xs ',
                previewImage: 'text-foreground',
            }}
        />

    )
}

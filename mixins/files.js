import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faFile, faImage, faFileExcel, faFilePdf, faFileWord, faFilePowerpoint,
} from '@fortawesome/free-solid-svg-icons';

const Images = ['jpg', 'png', 'jpeg', 'gif'];
const SpreadSheets = ['xls', 'xlsx', 'csv', 'numbers'];
const Documents = ['doc', 'docx', 'pages'];
const Ppts = ['ppt', 'pptx', 'key'];
const Pdfs = ['pdf'];

library.add(faFile, faImage, faFileExcel, faFilePdf, faFileWord, faFilePowerpoint);

export default {
    computed: {
        extension() {
            return this.file.name.split('.').pop().toLowerCase();
        },
        isImage() {
            return Images.includes(this.extension);
        },
        isPdf() {
            return Pdfs.includes(this.extension);
        },
        isViewable() {
            return this.isImage || this.isPdf;
        },
        icon() {
            if (this.isImage) {
                return faImage;
            }

            if (this.isPdf) {
                return faFilePdf;
            }

            if (SpreadSheets.includes(this.extension)) {
                return faFileExcel;
            }

            if (Documents.includes(this.extension)) {
                return faFileWord;
            }

            if (Ppts.includes(this.extension)) {
                return faFilePowerpoint;
            }

            return faFile;
        },
    },
};

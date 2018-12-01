<template>
    <div>
        <div v-if="selected.length > 0" class="p-lg-2 d-flex">
            <read-files-button :files="selected" class="mr-2" />
            <add-to-directory-button :files="selected" />
        </div>
        <div class="row no-gutters">
            <div class="col-6 col-sm-4 p-lg-2" v-for="(file, k) in files" :key="k">
                <file-preview :file="file" />
            </div>
        </div>
    </div>
</template>

<script>
    import filePreview from './FilePreview.vue';
    import addToDirectoryButton from '../files/AddToDirectoryButton.vue';
    import readFilesButton from '../files/ReadFilesButton.vue';

    export default {
        components: {
            filePreview,
            addToDirectoryButton,
            readFilesButton,
        },
        data() {
            return {
                files: [
                    {
                        id: 0,
                        filename: 'yoloswag.pdf',
                        icon: 'file-pdf',
                        tags: ['swag', 'yolo'],
                        date: new Date(),
                        src: 'http://www.pdf995.com/samples/pdf.pdf',
                        author: 'jean michel',
                        selected: false,
                    },
                    {
                        id: 0,
                        filename: 'yoloswag.pdf',
                        icon: 'file-pdf',
                        tags: ['swag', 'yolo'],
                        date: new Date(),
                        src: 'http://www.pdf995.com/samples/pdf.pdf',
                        author: 'jean michel',
                        selected: false,
                    },
                    {
                        id: 0,
                        filename: 'yoloswag.pdf',
                        icon: 'file-pdf',
                        tags: ['swag', 'yolo'],
                        date: new Date(),
                        src: 'http://www.pdf995.com/samples/pdf.pdf',
                        author: 'jean michel',
                        selected: false,
                    },
                ],
            };
        },
        computed: {
            selected() {
                return this.files.filter(file => file.selected);
            },
        },
    };
</script>

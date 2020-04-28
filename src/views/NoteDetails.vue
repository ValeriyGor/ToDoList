<template>
    <div class="noteDetails">
        <template v-if="noteData">
            <span class="linkToHomePage" @click="backToHome">
                <i class="fa fa-arrow-left"></i> Вернуться к списку
            </span>
            <div class="noteDetails__header mb-15">
                <h2 class="noteDetails__title">
                    Название:
                    <input type="text" v-model="noteData.title" class="noteDetails__input" @change="changeNoteState">
                </h2>

                <div class="noteDetails__actions">
                    <button
                        type="button"
                        class="button button--rounded button--secondary"
                        :class="{'button--disabled': !(currentHistoryIndex > 0)}"
                        @click="undo"
                        :disabled="!(currentHistoryIndex > 0)"
                    >
                        <i class="fa fa-undo"></i>
                    </button>
                    <button
                        type="button"
                        class="button button--rounded button--secondary"
                        :class="{'button--disabled': !(currentHistoryIndex < history.length - 1)}"
                        @click="redo"
                        :disabled="!(currentHistoryIndex < history.length - 1)"
                    >
                        <i class="fa fa-redo"></i>
                    </button>
                    <button
                        type="button"
                        class="button button--rounded button--danger"
                        @click="removeNote"
                    >
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <h3 class="mb-15">Задачи:</h3>
            <ul class="noteDetails__todo-list">
                <li v-for="(todo, index) in noteData.todoList" class="note__todo-item mb-15" :key="index">
                    <label>
                        <input
                            type="checkbox"
                            v-model="todo.done"
                            @change="changeNoteState"
                        >
                        <span></span>
                        <input
                            type="text"
                            v-model="todo.title"
                            class="noteDetails__input noteDetails__input--small"
                            @change="changeNoteState"
                        >
                    </label>
                    <button
                        type="button"
                        class="button button--primary button--small"
                        @click="addToDo"
                        v-if="index == 0"
                    > <i class="fa fa-plus"></i>
                    </button>
                    <button
                        type="button"
                        class="button button--danger button--small"
                        @click="removeToDo(index)"
                        v-if="index > 0"
                    > <i class="fa fa-trash-alt"></i>
                    </button>
                </li>
            </ul>
            <div class="text-center noteDetails__buttons">
                <button
                    type="button"
                    class="button button--secondary"
                    @click="save"
                    v-if="modePage === 'update'"
                > Сохранить заметку
                </button>
                <button
                    type="button"
                    class="button button--primary"
                    @click="addNote"
                    v-if="modePage === 'create'"
                > Создать заметку
                </button>
            </div>
        </template>
        <template v-else>
            <p class="text-center">В подгрузке данных произошла ошибка, <router-link to="/" class="linkToHomePage">вернуться на главную</router-link></p>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'ToDoDetails',
        data() {
            return {
                beforeNoteState: {},
                afterNoteState: {},
                noteData: {},
                modePage: '',
                history: [],
                currentHistoryIndex: -1
            }
        },
        computed: {
            noteIndex() {
                return this.$route.params.noteIndex;
            }
        },
        created() {
            if(this.$route.path === "/create") {
                this.modePage = 'create';
                this.noteData = {
                    title: '',
                    todoList: [{
                        title: '',
                        done: false
                        }
                    ]
                }
            } else {
                this.modePage = 'update';
                if(this.$route.params.noteData) {
                    this.noteData = JSON.parse(JSON.stringify(this.$route.params.noteData)); // убираем связь обьекта из store
                } else {
                    this.noteData = this.$route.params.noteData
                }
            }
            this.changeNoteState();
        },
        methods: {
            removeNote() {
                this.$store.dispatch('removeNote', this.noteIndex);
                this.$router.push('/');
            },
            addToDo() {
                this.noteData.todoList.push({title: "", done: false});
                this.changeNoteState();
            },
            removeToDo(index) {
                this.noteData.todoList.splice(index, 1);
                this.changeNoteState();
            },
            save() {
                let meta = {
                    index: this.noteIndex,
                    data: this.noteData
                }
                this.$swal({
                    title: 'Успешно!',
                    html: 'Заметка успешно обновлена',
                    type: 'success',
                    onClose: () => {
                        this.$store.dispatch('editNote', meta);
                        this.$router.push('/');
                    }
                })

            },
            addNote() {
                this.$swal({
                    title: 'Успешно!',
                    html: 'Заметка успешно создана',
                    type: 'success',
                    onClose: () => {
                        this.$store.dispatch('addNote', this.noteData);
                        this.$router.push('/');
                    }
                })
            },
            changeNoteState() {
                // Метод который записывает данные в массив изменений
                this.history.push(JSON.stringify(this.noteData));
                this.currentHistoryIndex++;

                // Если мы изменяем данные при том когда откатились назад, то внесенные изменения должны удалиться
                if(this.history.length - 1 !== this.currentHistoryIndex){
                    this.history.length = this.currentHistoryIndex + 1;
                }
            },
            undo() {
                this.noteData = JSON.parse(this.history[--this.currentHistoryIndex]);
            },
            redo() {
                this.noteData = JSON.parse(this.history[++this.currentHistoryIndex]);
            },
            backToHome() {
                if(this.currentHistoryIndex > 0) {
                    this.$swal.fire({
                        title: "Отменить изменения?",
                        text: "Если вы уйдете, внесенные изменения будут отменены",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: "Да, отменнить",
                        cancelButtonText: "Нет, остаться"
                    }).then((result) => {
                        if (result.value) {
                            this.$router.push('/');
                        }
                    })
                } else {
                    this.$router.push('/');
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    .noteDetails
        background-color: #222
        padding: 15px  15px 25px
        border-radius: 5px
        &__header
            display: flex
            align-items: center
            justify-content: space-between

        &__input
            padding: 10px 15px
            font-size: 16px
            min-width: 200px
            color: #fff
            display: inline-block
            border: 1px solid #fff
            background-color: transparent
            border-radius: 5px
            margin-left: 10px
            font-family: Montserrat
            &--small
                padding: 5px 10px
                font-size: 14px
        &__buttons
            margin-top: 25px
        h2
            margin: 0

    .linkToHomePage
        text-decoration: none
        color: #fff
        transition: all 0.15s
        font-size: 14px
        display: inline-block
        margin-bottom: 30px
        color: #08c
        cursor: pointer
        &:hover
            color: #aaa

    @media screen and (max-width: 767px)
        .noteDetails
            position: relative
            &__header
                .noteDetails__input
                    display: block
                    margin: 15px auto
            &__actions
                position: absolute
                top: 10px
                right: 15px
            &__title
                width: 100%
                text-align: center
            &__input
                padding: 8px 15px
                font-size: 13px
                max-width: 150px
                &--small
                    padding: 5px 10px
                    font-size: 14px
            &__todo-list
                text-align: center

            h3
                text-align: center

</style>

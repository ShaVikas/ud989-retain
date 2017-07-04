$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr, timeStr) {
            model.add({
                time: timeStr,
                content: noteStr
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function () {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val(), Date.now());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                if (note.time) {
                    htmlStr += '<li class="note"><div class="note-date">' +
                        new Date(note.time).toString() + " </div>: " +
                        note.content +
                    '</li>';
                }
                else {
                    htmlStr += '<li class="note">' +
                        note.content +
                    '</li>';
                }
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});
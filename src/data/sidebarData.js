import scratchpadLogo from '../images/scratchpad.svg';
import scratchpadLogoActive from '../images/scratchpad-active.svg';
import notesLogo from '../images/notes.svg';
import notesLogoActive from '../images/notes-active.svg';
import todosLogo from '../images/todos.svg';
import todosLogoActive from '../images/todos-active.svg';
import doodleLogo from '../images/doodle.svg';
import doodleLogoActive from '../images/doodle-active.svg';
import calendarLogo from '../images/calendar.svg';
import calendarLogoActive from '../images/calendar-active.svg';

const tabData = [
    { name: 'ScratchPad', id: 'ScratchPad', icon: scratchpadLogo, iconSelected: scratchpadLogoActive },
    { name: 'Notes', icon: notesLogo, id: 'Notes', iconSelected: notesLogoActive },
    { name: 'Todos (Coming Soon)', icon: todosLogo, id: 'Todos', iconSelected: todosLogoActive, disabled: true },
    { name: 'Doodle (Coming Soon)', icon: doodleLogo, id: 'Doodle', iconSelected: doodleLogoActive, disabled: true },
    { name: 'Calendar (Coming Soon)', icon: calendarLogo, id: 'Calendar', iconSelected: calendarLogoActive, disabled: true },
];

export default tabData;
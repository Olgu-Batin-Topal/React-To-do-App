const start = document.getElementById('app'),
    root = ReactDOM.createRoot(start);

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.inputChecked = this.inputChecked.bind(this);
        this.localProcess = this.localProcess.bind(this);
        this.todoSil = this.todoSil.bind(this);
    }

    inputChecked(e) {
        let todoID = e.target.getAttribute('todo-id'),
            todoElement = document.getElementById(todoID);

        todoElement.classList.toggle('active');
    }

    localProcess(e) {
        let dataID = e.target.getAttribute('data-id'),
            data = localStorage.getItem(dataID),
            dataArray = data.split(','),
            head = dataArray[0],
            description = dataArray[1],
            active = dataArray[2],
            sil = dataArray[3];

        if (active == 0) {
            active = 1;
        } else {
            active = 0;
        }

        localStorage.setItem(dataID, [
            head,
            description,
            active,
            0
        ]);
    }

    todoSil(e) {
        let dataID = e.target.getAttribute('data-id'),
            data = localStorage.getItem(dataID),
            dataArray = data.split(','),
            head = dataArray[0],
            description = dataArray[1];

        localStorage.setItem(dataID, [
            head,
            description,
            1,
            1
        ]);

        appRender();
    }

    render() {
        let data = localStorage.getItem(this.props.getItem),
            dataArray = data.split(','),
            head = dataArray[0],
            description = dataArray[1],
            active = dataArray[2],
            sil = dataArray[3],
            setChecked = '';

        if (active == 0) {
            active = '';
            setChecked: '';
        } else {
            active = ' active ';
            setChecked = ' checked ';
        }

        if (sil == 1) {
            sil = 'delete';
        } else {
            sil = '';
        }

        return (
            <div id={"todo" + this.props.getNumber} className={'todo-item ' + active + sil}>
                <div className="item-checkbox">
                    <input id={"checkbox" + this.props.getNumber} todo-id={"todo" + this.props.getNumber} defaultChecked={setChecked} type="checkbox" className="checkbox" onClick={this.inputChecked} />
                    <label htmlFor={"checkbox" + this.props.getNumber} className="checkbox-label" data-id={this.props.getItem} onClick={this.localProcess} />
                </div>
                <div className="item-text">
                    <h3 className="text-head">{head}</h3>
                    <p className="text-description">
                        {description}
                    </p>
                </div>
                <div className="item-delete">
                    <i onClick={this.todoSil} data-id={this.props.getItem} className="fa-solid fa-trash-can"></i>
                </div>
            </div>
        );
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let items = localStorage.getItem('todoItems'),
            itemsArray = items.split(',');
        return (
            <section id="todo" className="container">
                {
                    itemsArray.map((item, key) =>
                        <TodoItem key={key} getItem={item} getNumber={item.slice(-1)} />
                    )
                }
            </section>
        );
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(e) {
        e.preventDefault();

        let todoHead = e.target.HEAD.value,
            todoDescription = e.target.DESCRIPTION.value,
            todoNumber = localStorage.getItem('todoNumber'),
            todoName = 'todo' + todoNumber;

        if (todoHead == '' || todoDescription == '') {
            toastr.error('İçerik boş bırakılamaz!')
        } else {
            localStorage.setItem(todoName, [
                todoHead,
                todoDescription,
                0,
                0
            ]);
            toastr.success('To-do oluşturuldu!');
            localStorage.setItem('todoNumber', parseInt(todoNumber) + 1);
            let todoItems = localStorage.getItem('todoItems');
            if (todoItems != null) {
                if (todoItems == 'todo0') {
                    localStorage.setItem('todoItems', [
                        todoItems,
                        todoName
                    ]);
                    
                    localStorage.setItem('todo0', [
                        null,
                        null,
                        1,
                        1
                    ]);
                } else {
                    localStorage.setItem('todoItems', [
                        todoItems,
                        todoName
                    ]);
                }
            } else {
                localStorage.setItem('todoItems', [
                    todoName
                ]);
            }
            e.target.HEAD.value = '';
            e.target.DESCRIPTION.value = '';
            appRender();
        }
    }

    render() {
        return (
            <section id="form" className="container">
                <form onSubmit={this.formSubmit} className="todo-form">
                    <input type="text" name="HEAD" placeholder="To-do başlığı" />
                    <input type="text" name="DESCRIPTION" placeholder="To-do açıklaması" />
                    <input type="submit" value="To-do Oluştur" />
                </form>
            </section>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        let todoNumber = localStorage.getItem('todoNumber');

        if (todoNumber == null) {
            localStorage.setItem('todoNumber', 1);
            localStorage.setItem('todoItems', 'todo0')
            localStorage.setItem('todo0', [
                'Örnek To-do Başlığı (ilk To-do oluştuktan sonra otomatik silinecektir.)',
                'Örnek To-do Açıklaması (ilk To-do oluştuktan sonra otomatik silinecektir.)',
                0,
                0
            ]);
        }
    }

    render() {
        return (
            <main>
                <Form />
                <Todo />
            </main>
        );
    }
}

function appRender() {
    root.render(<App />);
}

appRender();
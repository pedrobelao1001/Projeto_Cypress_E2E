/// <reference types="cypress"/>
describe('tarefas', () => {

    let testData;
    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t
        })
    })

    context('cadastro', () => {
        it('deve cadastrar uma nova terefa para teste', () => {
            const taskName = 'Ler um livro node.JS'

            cy.removeTaskByName(taskName)
            cy.createTask(taskName)

            cy.contains('main div p', taskName)
                .should('be.visible')

        })

        it('não deve permitir tafefa duplicada', () => {

            const task = testData.dup

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            //Dado que eu tenha uma tarefa duplicada


            //Quando faço cadatro dessa nova tarefa
            cy.createTask(task.name)
            //Então vejo a mensagem de duplicidade

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')

        })

        it('campo obrigatório', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })
    context('atualização', () => {
        it('deve concluir uma tarefa', () => {
            const task = {
                name: 'livro teste',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')
        })
    })
    context('Exclusão', () => {
        it('deve remover uma tarefa', () => {
            const task = {
                name: 'Estudar JavaScript',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')
        })
    })
})


import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components/macro'
import loadLocal from '../../lib/loadLocal'
import saveLocal from '../../lib/saveLocal'
import ServiceCard from '../ServiceCard/ServiceCard'
import Result from '../Result/Result'
import Button from '../Button/Button'
import NewService from '../FormComponents/NewService'
import Header from '../Header/Header'

export default function App() {
  const [services, setServices] = useState(loadLocal('services') ?? [])
  const [sum, setSum] = useState(0)
  const [openServiceFrom, setOpenServiceFrom] = useState('home')

  useEffect(() => {
    saveLocal('services', services)
  }, [services])

  return (
    <>
      <AppLayout>
        <Header title={'QuickQalc'} />
        <Content>
          {services.map(({ name, costs, id }) => (
            <ServiceCard
              key={id}
              name={name}
              costs={costs}
              onPlus={handlePlus}
              onMinus={handleMinus}
              services={services}
              onAddingNewCosts={updateCosts}
            />
          ))}
        </Content>

        <ButtonBox>
          <ButtonNewService
            onClick={() => setOpenServiceFrom('newService')}
            bgColor={{ name: 'white' }}
          >
            New
          </ButtonNewService>
          <Result resultValue={sum} />
          <Delete onClick={() => localStorage.clear()}>clear</Delete>
        </ButtonBox>
        {openServiceFrom === 'newService' && (
          <NewService
            onSubmit={addNewService}
            onAddNewService={setOpenServiceFrom}
          />
        )}
      </AppLayout>
    </>
  )

  function updateCosts(index, currentCosts) {
    const currentService = services[index]
    setServices([
      ...services.slice(0, index),
      { ...currentService, costs: currentCosts },
      ...services.slice(index + 1),
    ])
  }

  function addNewService({ name, costs }) {
    const newService = {
      id: uuidv4(),
      name,
      costs,
    }
    setServices([...services, newService])
    console.log(newService)
  }

  function handlePlus(costs) {
    console.log(services)
    setSum(sum + costs)
  }

  function handleMinus(costs) {
    setSum(sum - costs)
  }
}

const AppLayout = styled.div`
  display: grid;
  grid-template-rows: 50px auto 50px;
  gap: 10px;
  height: 100vh;
  position: relative;
  filter: ${props => props.blur};
`

const ButtonNewService = styled(Button)`
  width: 100px;
  color: black;
  border: 1px solid darkgray;
`

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Content = styled.div`
  display: grid;
  gap: 10px;
  grid-auto-rows: min-content;
  padding: 15px;

  margin: 0 auto;
  overflow-y: scroll;
  width: 100%;
`
const Delete = styled.button`
  height: 50px;
`

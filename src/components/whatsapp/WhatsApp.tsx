import { FloatingWhatsApp } from 'react-floating-whatsapp';

function WhatsApp() {
  return (
    <div
     style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 100,
        width: '60px', 
        height: '60px', 
        pointerEvents: 'auto', 
    }}
      >
        <FloatingWhatsApp 
        phoneNumber='+5511966073066'
        accountName='Nexo Seguros'
        avatar='https://i.ibb.co/Kz9RnStV/nexo.png'
        statusMessage='Assistente virtual Nex'
        chatMessage='Olá, gostaria de conversar pelo WhatsApp?'
        placeholder='Digite sua pergunta'
        />
    </div>
  )
}

export default WhatsApp

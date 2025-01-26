import { EventNotification } from './EventMatch'

interface EventSubstitutionProps {
  notification: EventNotification
}

const EventSubstitution = ({ notification }: EventSubstitutionProps) => {

  if (!notification) return <></>

  return (
    <div className="relative flex w-full font-['Roboto_Condensed']">
      <div
        className="absolute -top-[2px] left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, #0534da 0%, #4bded8 100%)',
        }}
      ></div>
      <div className=" text-xl font-bold absolute top-0 -left-0 flex items-center h-[100%]">
        <img
          src="/logoEquipo.png"
          alt="Logo"
          className="h-16 w-full object-contain"
        />
      </div>
      <div className="flex flex-col h-[100%] w-full">
        <div
          className="h-[50%] w-full flex justify-center items-center"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,7,85,1) 0%, rgba(0,44,198,1) 100%)',
          }}
        >
          <span className="text-white text-center text-2xl font-bold">
            {notification.substitute}
          </span>
        </div>
        <div className="h-[50%] bg-[rgba(0,7,85,.8)] w-full flex justify-center items-center">
          <span className="text-white text-2xl font-bold">
            {notification.replacement}
          </span>
        </div>
      </div>
    </div>
  )
}

export default EventSubstitution

export default function ChatSideBar(){

    return (
        <>
        <div className="space-y-4">
            <div className="flex space-x-2">
              <input type="search" placeholder="Search" className="flex-1 px-4 py-2 rounded-lg bg-gray-100" />
              <button className="px-4 py-2 rounded-lg bg-gray-100">Compose</button>
            </div>

            <div className="bg-black text-white p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ez5Owl2cTM6rhC5S36r2Qbof0Othu9.png"
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <span>Robert James</span>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ez5Owl2cTM6rhC5S36r2Qbof0Othu9.png"
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <span>Robert James</span>
              </div>
            </div>
          </div>
        </>
    )
}
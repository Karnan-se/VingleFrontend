export default function DashboardMain(){

    return (
        <>

<main className="flex-1 p-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Revenue</h3>
            <p className="text-2xl font-semibold mt-2">₹2100000</p>
          </div>

        
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Courses</h3>
            <p className="text-2xl font-semibold mt-2">65</p>
          </div>

       
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Tutors</h3>
            <p className="text-2xl font-semibold mt-2">12</p>
          </div>

         
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm">Total Students</h3>
            <p className="text-2xl font-semibold mt-2">252</p>
          </div>
        </div>

      
        {/* <Chart
            data={data}
            activeRange={activeRange}
            timeRanges={timeRanges}
            handleRangeChange={handleRangeChange}
          /> */}
      </main>
        </>
    )
}
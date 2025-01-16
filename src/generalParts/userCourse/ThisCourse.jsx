import { ChevronDown, Star, PlayCircle, FileText, Monitor, Award } from 'lucide-react';


export default function ThisCourse({course}){

    return(
        <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">This course Includes:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5" />
            <span>70.5 hours on-demand video</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <span>20 downloadable resources</span>
          </div>
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            <span>Access on mobile and TV</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>Certificate of completion</span>
          </div>
        </div>
      </div>
    )
}
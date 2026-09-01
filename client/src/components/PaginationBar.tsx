interface PaginationBarProps{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number)=> void;
}

export default function Paginationbar({
    currentPage,
    totalPages,
    onPageChange
    }:PaginationBarProps){
    return(
        <nav className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-full" aria-label="Pagination">
            <button className="btn btn-outline btn-sm" 
                disabled={currentPage === 1}
                onClick={()=>{ onPageChange(currentPage -1)}}>
                    ‹ Previous
            </button>

            {Array.from({length: totalPages}, (_, index)=>{
                const page = index+1
                return(
                    <button key={page} 
                        className={ page === currentPage
                            ? "btn btn-primary btn-sm"
                            : "btn btn-outline btn-sm"
                        }
                        onClick={ ()=>{onPageChange(page)}}>
                        {page}
                    </button>
                );
            })}
            <button className="btn btn-outline btn-sm"
                disabled={currentPage === totalPages}
                onClick={()=>{ onPageChange(currentPage+1)}}>
                    Next ›
            </button>
        </nav>
    )
}
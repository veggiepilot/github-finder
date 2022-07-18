import PropTypes from 'prop-types'
import RepoItem from './RepoItem'

function RepoList({repos}) {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
        <div className='flex justify-center mt-4 text-3xl font-bold card-title'>
            <h2>
                Latest Repositories
            </h2>
        </div>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 card-body'>
            {repos.map((repo) => (
                <RepoItem key={repo.id} repo={repo}/>
            ))}
        </div>
    </div>
  )
}

RepoList.propTypes = {
    repos: PropTypes.array.isRequired
}

export default RepoList

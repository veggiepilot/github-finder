import {FaCodepen, FaStore, FaUserFriends, FaUsers} from 'react-icons/fa'
import { useEffect, useContext } from 'react'
import {useParams, Link} from 'react-router-dom'
import Spinner from '../components/layout/Spinner'
import RepoList from '../components/repos/RepoList'
import GithubContext from '../context/github/GithubContext'
import {getUserAndRepos} from '../context/github/GithubActions'

function User() {
    const { user, loading, repos, dispatch } = useContext(GithubContext)

    const params = useParams()

    useEffect(() => {
        dispatch({type: 'SET_LOADING'})
        const getUserData = async() => {
            const userData = await getUserAndRepos(params.login)
            dispatch({type: 'GET_USER_AND_REPOS', payload: userData})
        }

        getUserData()
    }, [dispatch, params.login])

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following, 
        public_repos,
        public_gists,
        hireable
    } = user

    if(loading) {
        return <Spinner />
    }

    return (
        <>
            <div className='w-full mx-auto lg:w-10/12'>
                <div className='mb-4'>
                    <Link to='/' className='btn btn-ghost'>
                        Back To Search
                    </Link>
                </div>
                <div className="grid grid-cols-2 mx-auto mb-6">
                    <div className='grid justify-items-end mr-5 custom-card-image mb-6  md:mb-0 '>
                        <div className='w-36  md:w-72 rounded-lg shadow-xl card image-full'>
                            <a 
                                href={html_url}
                                target='_blank' 
                                rel='noreferrer'
                            >
                                <figure>
                                   <img src={avatar_url} alt=''/>
                                </figure>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-3xl card-title'>
                            {name}
                            <div className='ml-2 mr-1 badge badge-success'>
                                {type}
                            </div>
                            {hireable && (
                                <div className='mx-1 badge badge-info'>
                                    Hireable
                                </div>
                            )}
                        </h1>  
                        <p>{bio}</p>
                        <div className='mt-4'>                              
                            <a href={`https://${blog}`}><div className='btn btn-outline mr-2 bg-violet-500 hover:bg-violet-400 text-white shadow-md'>Website</div></a>
                            <a href={`https://twitter.com/${twitter_username}`}><div className='btn btn-outline ml-2 bg-violet-500 hover:bg-violet-400 text-white shadow-md'>Twitter</div></a>
                        </div>
                        <div className='mt-4 card-actions'>
                            <a 
                                href={html_url} 
                                target='_blank' 
                                rel='noreferrer' 
                                className='btn btn-outline'
                            >
                                Visit Github Profile
                            </a>
                        </div>
                    </div>
                </div>
                <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats card'>
                    <div className='stat'>
                        <div className='stat-title pr-5'>
                            Followers
                        </div>
                        <div className='stat-value pr-5 text-3xl md:text-4xl text-violet-600'>
                            {followers}
                        </div>
                    </div>

                    <div className='stat'>
                        <div className='stat-title pr-5'>
                            Following
                        </div>
                        <div className='stat-value pr-5 text-3xl md:text-4xl text-pink-600'>
                            {following}
                        </div>
                    </div>

                    <div className='stat'>
                        <div className='stat-title pr-5'>
                            Public Repos
                        </div>
                        <div className='stat-value pr-5 text-3xl md:text-4xl text-orange-600'>
                            {public_repos}
                        </div>
                    </div>

                    <div className='stat'>
                        <div className='stat-title pr-5'>
                            Public Gists
                        </div>
                        <div className='stat-value pr-5 text-3xl md:text-4xl text-sky-600'>
                            {public_gists}
                        </div>
                    </div>
                </div>
                <RepoList repos={repos}/>
            </div>
        </>
    )
}

export default User
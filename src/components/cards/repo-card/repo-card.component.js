import React from 'react';
import Modal from 'react-modal';

const ModalComponent = ({ agencyName, name, description, isGitHubRepo, languages, licenseName, repoID, repositoryURL, usageType }) => (
  <div class="repo-list-item card card--focusable">
    <h3 class="repo-name">
      <a href="/repos/{{repoID}}">{{ name }}</a>
    </h3>

    {agencyName && 
      <p class="repo-agency-icon">
        <span>{{ agencyName }}</span>
      </p>
    }
    
    {description &&
      <p class="repo-description">{ description.substring(0, 200) }</p>
    }

    <ul class="repo-features">
      {isGitHubRepo &&
        <li>
          <i class="icon icon-github"></i>
          <span><a href={repositoryURL}>{repositoryURL}</a></span>
        </li>
      }

      {usageType === 'openSource' &&
        <li><i class="icon icon-ok-circled2"></i><span>Open Source</span></li>
      }

      {usageType === 'governmentWideReuse' &&
        <li><i class="icon icon-arrows-cw"></i><span>Gov-wide Reuse</span></li>
      }

      {usageType === 'languages' &&
        <li class="language"><i class="icon icon-code"></i>
        {languages.map(language => <span>{{ language }}</span>)}
        </li>
      }

      {licenseName &&
        <li>
          <i class="icon icon-certificate"></i>
          <span>{{ licenseName }}</span>
        </li>
      }
    </ul>
  </div>
)
export default ModalComponent;
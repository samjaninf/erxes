import React, { PropTypes } from 'react';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Wrapper } from '/imports/react-ui/layout/components';
import { EmptyState } from '/imports/react-ui/common';


const propTypes = {
  integrations: PropTypes.array.isRequired,
};

function Integrations({ integrations }) {
  const { Section, filter, getActiveClass } = Wrapper.Sidebar;

  return (
    <Section collapsible={integrations.length > 5}>
      <Section.Title>Filter by integrations</Section.Title>

      <Section.QuickButtons>
        <a
          href={FlowRouter.path('settings/integrations/list')}
          className="quick-button"
        >
          <i className="ion-gear-a" />
        </a>

        {
          FlowRouter.getQueryParam('integration')
            ? (
              <a
                tabIndex={0}
                className="quick-button"
                onClick={() => { filter('integration', null); }}
              >
                <i className="ion-close-circled" />
              </a>
            )
            : null
        }
      </Section.QuickButtons>

      <ul className="filters">
        {
          integrations.length
          ? integrations.map(integration =>
            <li key={integration}>
              <a
                tabIndex={0}
                className={getActiveClass('integration', integration)}
                onClick={() => { filter('integration', integration); }}
              >
                {integration}
                <span className="counter">
                  {Counts.get(`customers.integration.${integration}`)}
                </span>
              </a>
            </li>,
          )
          : <EmptyState
            icon={<i className="ion-arrow-swap" />}
            text="No integrations"
            size="small"
          />
        }
      </ul>
    </Section>
  );
}

Integrations.propTypes = propTypes;

export default Integrations;

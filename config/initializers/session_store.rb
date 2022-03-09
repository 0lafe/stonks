if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: '_invest_ed', domain: 'invest-ed.herokuapp.com'
else
    Rails.application.config.session_store :cookie_store, key: '_invest_ed'
end
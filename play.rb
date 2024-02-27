require 'date'

data= [
        [
            {
                "transaction_date": "2024-02-26",
                "created_at": "2024-02-26T19:45:27.391Z",
            },
            {
                "transaction_date": "2024-02-24",
                "created_at": "2024-02-24T21:51:39.695Z",
            },
        ],
        [
            {
                "transaction_date": "2024-02-26",
                "created_at": "2024-02-30T19:45:27.391Z",
            },
            {
                "transaction_date": "2024-02-24",
                "created_at": "2024-02-24T21:51:39.695Z",
            },
        ],
        [
            {
                "transaction_date": "2024-02-26",
                "created_at": "2024-02-26T19:48:12.923Z",
            },
            {
                "transaction_date": "2024-02-24",
                "created_at": "2024-02-24T21:54:24.975Z",
            },
            
        ],
        [
          {
                "transaction_date": "2024-02-26",
                "created_at": "2024-02-28T19:48:12.923Z",
            },
            {
                "transaction_date": "2024-02-24",
                "created_at": "2024-02-30T21:54:24.975Z",
            },

        ]
        
]

def latest data
  # Flatten the array of arrays
  flat_data = data.flatten
  
  # Find the maximum `created_at` date among all records
  latest_date = flat_data.sort_by { |item| item[:created_at] }.reverse!.first[:created_at].split('T').first

  # Filter by created_at, sort by transactionn_data
  latest_data = flat_data.select { |record| record[:created_at].to_s.split('T').first == latest_date}.sort_by { |item| item[:created_at] }
  
  latest_data
end
 

p latest(data)